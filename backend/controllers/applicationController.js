const Application = require('../Models/Application');
const Job = require('../Models/job');
const sendEmail = require('../utils/sendEmail');

const Notification = require('../Models/Notification');

const getAtsFromAI = require('../utils/ollama');
//const getAtsFromAI = require('../utils/aiAts');
const pdfParse = require('pdf-parse');
const axios = require('axios');



/**
 * ==================================================
 * CANDIDATE (CLERK USER) – APPLY JOB + ATS
 * ==================================================
 */
const applyJob = async (req, res) => {
  try {
    // 1️⃣ Resume validation
    if (!req.file) {
      return res.status(400).json({ message: 'Resume is required' });
    }
     console.log("it was start")
    const { job, applicantName, email, clerkUserId } = req.body;
    console .log(req.body)
    // 2️⃣ Clerk validation
    if (!clerkUserId) {
      return res.status(401).json({
        message: 'User not authenticated via Clerk',
      });
    }

    // 3️⃣ Fetch job FIRST (🔥 FIX)
    const jobExists = await Job.findById(job);

    if (!jobExists) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // 4️⃣ Prevent duplicate application
    const alreadyApplied = await Application.findOne({
      job,
      applicantClerkId: clerkUserId,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        message: 'You have already applied for this job',
      });
    }

    // ============================
    // 📄 RESUME PARSING
    // ============================

    const resumeResponse = await axios.get(req.file.path, {
      responseType: 'arraybuffer',
    });

    const resumeData = await pdfParse(resumeResponse.data);
    const resumeText = resumeData.text || '';
   console .log(resumeText,"resume txt finish")
    // ============================
    // 🧠 ATS SCORING (SAFE)
    // ============================

    // 7️⃣ Call AI ATS utility (CORRECT)

const atsResult = await getAtsFromAI(
  resumeText,
  jobExists.requirements
);

console.log("✅ ATS RESULT:", atsResult);

    // ================================
    // 💾 SAVE APPLICATION
    // ================================
    const application = await Application.create({
      job,
      applicantClerkId: clerkUserId,
      applicantName,
      email,
      resumeLink: req.file.path,

      atsScore: atsResult.atsScore,
      matchedSkills: atsResult.matchedSkills,
      missingSkills: atsResult.missingSkills,
      feedback: atsResult.feedback,

      status: 'Pending',
    });
     // ============================
    // 📧 SEND EMAIL (USER)
    // ============================
    sendEmail({
      to: email,
      subject: 'Application Submitted Successfully – HireX',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>✅ Application Received</h2>

          <p>Hello <strong>${applicantName}</strong>,</p>

          <p>You have successfully applied for:</p>

          <h3>${jobExists.title}</h3>

          <p><strong>Status:</strong> Pending</p>

          <p>
            Our recruiters will review your application.
            You will be notified once a decision is made.
          </p>

          <br/>
          <p>Best of luck!</p>
          <p><strong>HireX Team</strong></p>
        </div>
      `,
    });

    // ✅ RESPONSE
  

    res.status(201).json(application);
  } catch (error) {
    console.error('APPLY JOB ERROR:', error);
    res.status(500).json({ message: error.message });
  }
};


/**
 * ==================================================
 * CANDIDATE – MY APPLICATIONS (CLERK)
 * ==================================================
 */const myApplications = async (req, res) => {
  try {
    const { clerkUserId } = req.params;

    if (!clerkUserId) {
      return res.status(400).json({ message: 'Clerk userId required' });
    }

    const applications = await Application.find({
      applicantClerkId: clerkUserId,
    })
      .populate({
        path: 'job',
        select: 'title location category company isActive',
      })
      .sort({ createdAt: -1 });

    res.json({
      total: applications.length,
      applications,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/**
 * ==================================================
 * RECRUITER – VIEW ALL APPLICATIONS (JWT)
 * ==================================================
 */
const getApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('job')
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['Accepted', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const application = await Application.findById(req.params.id).populate('job');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = status;
    await application.save();
   

    
await Notification.create({
  userClerkId: application.applicantClerkId,
  message: `Your application for ${application.job.title} was ${status}`,
  type: 'StatusUpdate',
});
    // ============================
    // 📧 EMAIL NOTIFICATION
    // ============================

    const emailSubject =
      status === 'Accepted'
        ? '🎉 Congratulations! Your Application is Accepted – HireX'
        : '📄 Update on Your Job Application – HireX';

    const emailBody =
      status === 'Accepted'
        ? `
          <h2>🎉 Congratulations ${application.applicantName}!</h2>
          <p>Your application for the position:</p>
          <h3>${application.job.title}</h3>
          <p>has been <strong>ACCEPTED</strong>.</p>
          <p>The recruiter may contact you soon.</p>
          <br/>
          <p>Best wishes,<br/><strong>HireX Team</strong></p>
        `
        : `
          <h2>Hello ${application.applicantName},</h2>
          <p>Thank you for applying for:</p>
          <h3>${application.job.title}</h3>
          <p>After careful review, your application was not selected.</p>
          <p>Don’t give up — keep applying!</p>
          <br/>
          <p>Regards,<br/><strong>HireX Team</strong></p>
        `;

    sendEmail({
      to: application.email,
      subject: emailSubject,
      html: emailBody,
    });

    res.json({
      message: `Application ${status}`,
      application,
    });
  } catch (error) {
    console.error('UPDATE STATUS ERROR:', error);
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  applyJob,
  myApplications,
  getApplications,
  updateApplicationStatus,
};
