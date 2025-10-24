import emailjs from '@emailjs/browser';
import emailjsConfig from '../config/emailjs';

/**
 * Email service for sending various types of emails
 */
const emailService = {
  /**
   * Initialize EmailJS with the user IDs
   */
  init: () => {
    // Note: Modern versions of EmailJS don't require initialization unless
    // you're using a specific public key for all operations
    console.log('EmailJS service initialized');
  },

  /**
   * Send contact form submission
   * @param {Object} data - Contact form data
   * @returns {Promise} - Promise that resolves when emails are sent
   */
  sendContactForm: async (data) => {
    try {
      const { contact } = emailjsConfig.accounts;

      // Prepare template parameters for main contact email (to admin)
      const contactTemplateParams = {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      };

      // Prepare template parameters for auto-reply email (to user)
      const autoReplyTemplateParams = {
        name: data.name,
        email: data.email,
        message: data.message,
      };

      // Send email to admin
      const contactResponse = await emailjs.send(
        contact.serviceId,
        contact.templates.contactForm,
        contactTemplateParams,
        contact.userId
      );

      console.log('Contact email sent to admin:', contactResponse);

      // Send auto-reply to user
      const autoReplyResponse = await emailjs.send(
        contact.serviceId,
        contact.templates.autoReply,
        autoReplyTemplateParams,
        contact.userId
      );

      console.log('Auto-reply sent to user:', autoReplyResponse);

      return { success: true };
    } catch (error) {
      console.error('Failed to send contact emails:', error);
      throw error;
    }
  },

  /**
   * Send event enrollment confirmation emails
   * @param {Object} data - Enrollment form data
   * @param {Object} event - Event details
   * @returns {Promise} - Promise that resolves when emails are sent
   */
  sendEventEnrollment: async (data, event) => {
    try {
      const { events } = emailjsConfig.accounts;

      // Prepare template parameters for admin notification
      const adminTemplateParams = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        selectedCourse: data.selectedCourse,
        eventTitle: event.title,
        eventDate: event.date,
        eventPrice: event.price,
        notes: data.notes || 'No additional notes provided',
      };

      // Prepare template parameters for participant confirmation
      const participantTemplateParams = {
        name: data.name,
        email: data.email,
        eventTitle: event.title,
        eventDate: event.date,
        eventPrice: event.price,
        eventCategory: event.category,
      };

      // Send enrollment notification to admin
      const adminResponse = await emailjs.send(
        events.serviceId,
        events.templates.eventEnrollmentAdmin,
        adminTemplateParams,
        events.userId
      );

      console.log('Enrollment notification sent to admin:', adminResponse);

      // Send confirmation to participant
      const participantResponse = await emailjs.send(
        events.serviceId,
        events.templates.eventEnrollmentConfirmation,
        participantTemplateParams,
        events.userId
      );

      console.log('Enrollment confirmation sent to participant:', participantResponse);

      return { success: true };
    } catch (error) {
      console.error('Failed to send enrollment emails:', error);
      throw error;
    }
  },

  /**
   * Send internship application emails
   * @param {Object} data - Internship application data
   * @returns {Promise} - Promise that resolves when emails are sent
   */
  sendInternshipApplication: async (data) => {
    try {
      const { internship } = emailjsConfig.accounts;

      // Prepare template parameters for admin notification
      const adminTemplateParams = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        domain: data.domain,
        subject: 'New Internship Application',
        message: data.message || 'No additional message provided',
      };

      // Prepare template parameters for applicant confirmation
      const applicantTemplateParams = {
        name: data.name,
        email: data.email,
        domain: data.domain,
        message: 'Thank you for applying for an internship with us. We will review your application and get back to you soon.'
      };

      // Send application notification to admin
      const adminResponse = await emailjs.send(
        internship.serviceId,
        internship.templates.internshipAdmin,
        adminTemplateParams,
        internship.userId
      );

      console.log('Internship application sent to admin:', adminResponse);

      // Send confirmation to applicant
      const applicantResponse = await emailjs.send(
        internship.serviceId,
        internship.templates.internshipConfirmation,
        applicantTemplateParams,
        internship.userId
      );

      console.log('Application confirmation sent to applicant:', applicantResponse);

      return { success: true };
    } catch (error) {
      console.error('Failed to send internship application emails:', error);
      throw error;
    }
  }
};

export default emailService;
