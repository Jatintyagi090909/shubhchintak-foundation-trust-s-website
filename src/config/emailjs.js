// EmailJS configuration for @emailjs/browser package
const emailjsConfig = {
  // Account configurations
  accounts: {
    // Primary account for contact forms
    contact: {
      // Your EmailJS Public Key for contact forms (from Account > API Keys)
      userId: "hcR_rI0FpLe3V4REN",

      // Your EmailJS Service ID for contact forms
      serviceId: "service_nwrhhux",

      // Templates for contact form account
      templates: {
        // Template for sending contact form messages to admin
        // Template parameters:
        // - name: sender's name
        // - email: sender's email
        // - subject: email subject
        // - message: email message content
        contactForm: "template_bj18ozp",

        // Template for sending auto-reply messages to users
        // Template parameters:
        // - name: user's name
        // - email: user's email
        // - message: original message (optional)
        autoReply: "template_acc6qdj",
      }
    },

    // Account for internship applications
    internship: {
      // Your EmailJS Public Key for internship applications
      userId: "DToq8uq8gZtTnZ_BS",

      // Your EmailJS Service ID for internship applications
      serviceId: "service_vd5gst7",

      // Templates for internship application account
      templates: {
        // Template for sending internship applications to admin
        // Template parameters:
        // - name: applicant's name
        // - email: applicant's email
        // - phone: applicant's phone number
        // - domain: applicant's selected domain
        // - message: additional information (optional)
        internshipAdmin: "template_z51q58e",

        // Template for sending internship confirmation to applicants
        // Template parameters:
        // - name: applicant's name
        // - email: applicant's email
        // - domain: selected domain
        internshipConfirmation: "template_y1x0e49"
      }
    },

    // Secondary account for event enrollments
    events: {
      // Your EmailJS Public Key for event enrollments (from Account > API Keys)
      userId: "Tz7Y7UMfqYpC_PYYe",

      // Your EmailJS Service ID for event enrollments
      serviceId: "service_4tz6dw4",

      // Templates for event enrollment account
      templates: {
        // Template for sending event enrollment confirmation to admin
        // Template parameters:
        // - name: participant's name
        // - email: participant's email
        // - phone: participant's phone number
        // - address: participant's address
        // - eventTitle: title of the event
        // - eventDate: date of the event
        // - eventLocation: location of the event
        // - notes: additional notes from participant
        eventEnrollmentAdmin: "template_wk6a2pj",

        // Template for sending enrollment confirmation to participants
        // Template parameters:
        // - name: participant's name
        // - email: participant's email
        // - eventTitle: title of the event
        // - eventDate: date of the event
        // - eventLocation: location of the event
        // - eventCategory: category of the event
        eventEnrollmentConfirmation: "template_2ftto48"
      }
    }
  }
};


/**
 * Instructions to use this configuration:
 *
 * 1. Replace YOUR_CONTACT_FORM_PUBLIC_KEY with your first EmailJS Public Key for contact forms
 * 2. Replace YOUR_EVENTS_PUBLIC_KEY with your second EmailJS Public Key for event enrollments
 * 3. Replace YOUR_CONTACT_SERVICE_ID and YOUR_EVENTS_SERVICE_ID with your respective service IDs
 * 4. Replace template IDs with your actual template IDs for each account
 *
 * For contact forms:
 * - Make sure your contact form template includes {{name}}, {{email}},
 *   {{subject}}, and {{message}} variables.
 * - Make sure your auto-reply template includes at least {{name}} variable
 *   and any other variables you want to use.
 *
 * For event enrollment emails:
 * - Ensure your templates have the variables listed in the comments above each template ID.
 */

export default emailjsConfig;
