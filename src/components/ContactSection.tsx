import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

// EmailJS configuration - Replace with your actual keys
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_u8liggv',     // Replace with your EmailJS service ID
  TEMPLATE_ID: 'template_r9pbn86',   // Replace with your EmailJS template ID
  PUBLIC_KEY: 'omsz4yoiO7eLBLngn'      // Replace with your EmailJS public key
};

// Fixed destination email
const DESTINATION_EMAIL = '2006nareshd@gmail.com';

const ContactSection = () => {
  // Form state with all required fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  // UI state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Form reference for EmailJS
  const formRef = useRef<HTMLFormElement>(null);
  
  // Toast hook for notifications
  const { toast } = useToast();

  /**
   * Handle form submission with EmailJS integration
   * Captures current date/time and sends email with all form data
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Get current date and time
      const now = new Date();
      const submissionDateTime = now.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      });

      // Prepare template parameters for EmailJS
      const templateParams = {
        // Sender information
        from_name: formData.name,
        from_email: formData.email,
        from_phone: formData.phone,
        
        // Destination email
        to_email: DESTINATION_EMAIL,
        
        // Message content
        message: formData.message,
        
        // Hidden fields - automatically captured
        submission_date: submissionDateTime,
        timestamp: now.getTime().toString(),
        
        // Additional context for email template
        subject: `New Contact Form Submission from ${formData.name}`,
        reply_to: formData.email
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      // Handle successful submission
      if (response.status === 200) {
        setSubmitStatus('success');
        toast({
          title: "Message Sent Successfully! ✅",
          description: `Thank you ${formData.name}! I'll get back to you within 24 hours.`,
        });
        
        // Reset form after successful submission
        setFormData({ 
          name: '', 
          email: '', 
          phone: '', 
          message: '' 
        });
      }

    } catch (error) {
      // Handle submission error
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
      
      toast({
        title: "Message Failed to Send ❌",
        description: "There was an error sending your message. Please try again or contact me directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle input field changes
   * Updates form state for controlled components
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <section className="py-6 sm:py-8 lg:py-10 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            <span className="gradient-text">📬 Get In Touch</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Let's create the future with AI 🚀
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* Left Column - Contact Info */}
          <div className="glass-strong p-4 sm:p-6 rounded-2xl hover-float">
            <div className="text-center mb-4 sm:mb-5">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 gradient-text-secondary">
                Let's Connect
              </h3>
              <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm max-w-md mx-auto">
                I'm always excited to discuss new opportunities, collaborate on research projects, 
                or explore innovative AI solutions. Whether you're interested in machine learning 
                applications, data science consulting, or academic collaboration, I'd love to hear from you.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-2 sm:gap-2.5">
                {/* Phone */}
                <a 
                  href="tel:+917200754566"
                  className="flex items-center gap-3 hover:bg-primary/5 p-2.5 rounded-lg transition-all duration-300 cursor-pointer group border border-transparent hover:border-green-500/20"
                >
                  <div className="w-9 h-9 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/30 transition-colors">
                    <span className="text-green-400 text-base">📱</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-xs sm:text-sm text-foreground">Contact</div>
                    <div className="text-muted-foreground text-xs group-hover:text-green-400 transition-colors">+91 7200754566</div>
                  </div>
                </a>

                {/* WhatsApp */}
                <a 
                  href="https://wa.me/917200754566"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:bg-primary/5 p-2.5 rounded-lg transition-all duration-300 cursor-pointer group border border-transparent hover:border-green-600/20"
                >
                  <div className="w-9 h-9 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-600/30 transition-colors">
                    <span className="text-green-500 text-base">💬</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-xs sm:text-sm text-foreground">WhatsApp</div>
                    <div className="text-muted-foreground text-xs group-hover:text-green-500 transition-colors">+91 7200754566</div>
                  </div>
                </a>
                
                {/* Email */}
                <a 
                  href="mailto:2006nareshd@gmail.com"
                  className="flex items-center gap-3 hover:bg-primary/5 p-2.5 rounded-lg transition-all duration-300 cursor-pointer group border border-transparent hover:border-primary/20"
                >
                  <div className="w-9 h-9 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                    <span className="text-primary text-base">📧</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-xs sm:text-sm text-foreground">Email</div>
                    <div className="text-muted-foreground text-xs break-all group-hover:text-primary transition-colors">2006nareshd@gmail.com</div>
                  </div>
                </a>
                
                {/* LinkedIn */}
                <a 
                  href="https://www.linkedin.com/in/nareshdharmaraj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:bg-primary/5 p-2.5 rounded-lg transition-all duration-300 cursor-pointer group border border-transparent hover:border-secondary/20"
                >
                  <div className="w-9 h-9 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/30 transition-colors">
                    <span className="text-secondary text-base">💼</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-xs sm:text-sm text-foreground">LinkedIn</div>
                    <div className="text-muted-foreground text-xs truncate group-hover:text-secondary transition-colors">www.linkedin.com/in/nareshdharmaraj</div>
                  </div>
                </a>
                
                {/* GitHub */}
                <a 
                  href="https://github.com/nareshdharmaraj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:bg-primary/5 p-2.5 rounded-lg transition-all duration-300 cursor-pointer group border border-transparent hover:border-accent/20"
                >
                  <div className="w-9 h-9 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/30 transition-colors">
                    <span className="text-accent text-base">🐙</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-xs sm:text-sm text-foreground">GitHub</div>
                    <div className="text-muted-foreground text-xs truncate group-hover:text-accent transition-colors">github.com/nareshdharmaraj</div>
                  </div>
                </a>

                {/* Home Address */}
                <div className="mt-3 pt-3 border-t border-primary/10">
                  <div className="flex items-start gap-3 p-2.5 bg-background/30 rounded-lg">
                    <div className="w-9 h-9 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-400 text-base">📍</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-xs sm:text-sm text-foreground mb-1.5">Home Address</div>
                      <div className="text-muted-foreground text-xs leading-relaxed">
                        20/2, South Street,<br />
                        P.Velur (T.K), P.Velur (P.O),<br />
                        Namakkal (D.t), 638282<br />
                        Tamil Nadu, India
                      </div>
                      <a
                        href="https://maps.google.com/?q=11.103180253082767,78.00648407449182"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2 text-xs text-primary hover:text-primary/80 transition-colors font-medium group/map"
                      >
                        <span>View on Google Maps</span>
                        <svg className="w-3 h-3 group-hover/map:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                  {/* Embedded Map */}
                  <div className="mt-3 rounded-lg overflow-hidden border border-primary/20 shadow-lg">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3915.1368067755957!2d78.00648407449182!3d11.103180253082767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTHCsDA2JzExLjQiTiA3OMKwMDAnMzIuNiJF!5e1!3m2!1sen!2sin!4v1761382095232!5m2!1sen!2sin"
                      width="100%"
                      height="200"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full"
                      title="Home Location"
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground text-center mt-2">
                    📍 Location accurate within 10 meters
                  </p>
                </div>
              </div>
          </div>

          {/* Right Column - Response Time and Contact Form */}
          <div className="space-y-4 sm:space-y-5">
            {/* Quick Stats */}
            <div className="glass-strong p-4 sm:p-6 rounded-2xl hover-float">
              <h4 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4 gradient-text-accent">Response Time</h4>
              <div className="space-y-2 sm:space-y-2.5">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Email Inquiries</span>
                  <span className="text-primary font-medium">24 hours</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Project Consultations</span>
                  <span className="text-secondary font-medium">48 hours</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Research Collaborations</span>
                  <span className="text-accent font-medium">1 week</span>
                </div>
              </div>
            </div>

            {/* Enhanced Contact Form with EmailJS Integration */}
            <div className="glass-strong p-4 sm:p-6 rounded-2xl">
            <div className="mb-4 sm:mb-5">
              <h3 className="text-base sm:text-lg font-semibold gradient-text mb-1.5">
                Send Me a Message
              </h3>
              <p className="text-xs text-muted-foreground">
                All fields are required. I'll respond within 24 hours.
              </p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {/* Name Field - Required */}
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium mb-1.5 text-foreground">
                  Full Name <span className="text-destructive">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="glass border-primary/30 bg-background/50 focus:border-primary/60 transition-colors text-sm"
                  placeholder="Enter your full name"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Email Field - Required */}
              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-1.5 text-foreground">
                  Email Address <span className="text-destructive">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="glass border-primary/30 bg-background/50 focus:border-primary/60 transition-colors text-sm"
                  placeholder="your.email@example.com"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Phone Number Field - Required */}
              <div>
                <label htmlFor="phone" className="block text-xs sm:text-sm font-medium mb-1.5 text-foreground">
                  Phone Number <span className="text-destructive">*</span>
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="glass border-primary/30 bg-background/50 focus:border-primary/60 transition-colors text-sm"
                  placeholder="+1 (555) 123-4567"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Message Field - Required */}
              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium mb-1.5 text-foreground">
                  Message <span className="text-destructive">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="glass border-primary/30 bg-background/50 min-h-[100px] sm:min-h-[120px] focus:border-primary/60 transition-colors resize-none text-sm"
                  placeholder="Tell me about your project, research interests, or collaboration ideas..."
                  required
                  disabled={isSubmitting}
                />
                <div className="text-xs text-muted-foreground mt-1">
                  Characters: {formData.message.length}
                </div>
              </div>

              {/* Hidden Fields for EmailJS (automatically populated) */}
              <input type="hidden" name="submission_date" value={new Date().toISOString()} />
              <input type="hidden" name="to_email" value={DESTINATION_EMAIL} />
              
              {/* Submit Button with Loading State */}
              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:bg-gradient-primary/90 text-primary-foreground py-3 font-semibold glow-primary hover-scale transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    {submitStatus === 'success' && <CheckCircle2 className="w-4 h-4 mr-2" />}
                    {submitStatus === 'error' && <AlertCircle className="w-4 h-4 mr-2" />}
                    Send Message
                  </>
                )}
              </Button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Message sent successfully!</span>
                  </div>
                  <p className="text-xs text-green-300 mt-1">
                    Thank you for reaching out. I'll respond within 24 hours.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <div className="flex items-center gap-2 text-destructive">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Failed to send message</span>
                  </div>
                  <p className="text-xs text-destructive/80 mt-1">
                    Please try again or contact me directly at {DESTINATION_EMAIL}
                  </p>
                </div>
              )}

              {/* EmailJS Integration Notice */}
              <div className="text-xs text-muted-foreground text-center pt-2 border-t border-muted/20">
                <span>🔒 Secure email delivery powered by EmailJS</span>
              </div>
            </form>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;