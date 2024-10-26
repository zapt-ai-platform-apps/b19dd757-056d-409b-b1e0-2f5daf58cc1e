# LeadManager App

LeadManager is a free application that allows users to create and manage lists of potential leads effortlessly. Users can register with ease using social login options and start generating unlimited leads. The app provides features for sending mass emails, creating customizable forms to collect valuable information, and includes options to add links to products and services, facilitating direct sales.

## Features

1. **User Registration**
   - Easy registration with options for Google, Facebook, and Apple logins.
   - Secure authentication using Supabase.

2. **Lead Lists Management**
   - Create and manage multiple lead lists.
   - Edit and delete existing lead lists.

3. **Mass Email Sending**
   - User-friendly interface to compose and send bulk emails.
   - Personalize emails for better engagement.

4. **Customizable Forms**
   - Create forms with custom questions to gather additional information from leads.
   - Share forms via email or social media to collect responses.

5. **Product Links Integration**
   - Add links to products or services directly in your messages.
   - Track clicks on product links.

6. **Analytics Dashboard**
   - Visualize interaction metrics like open rates and click-through rates.
   - Access insights to improve your outreach strategies.

7. **User Feedback**
   - Collect comments and evaluations from your leads.
   - Engage with feedback to enhance your offerings.

8. **Social Media Integration**
   - Simplified sharing of lead lists and forms on major platforms.
   - Connect with a broader audience through social channels.

## User Journey

### 1. Registration and Login

- **Step 1:** Open the LeadManager App.
- **Step 2:** Click on "Sign in with ZAPT".
- **Step 3:** Choose a social login provider (Google, Facebook, Apple) or use email for magic link login.
- **Step 4:** Complete the authentication process.

### 2. Creating a Lead List

- **Step 1:** Navigate to the "Lead Lists" section.
- **Step 2:** Click on "Create New List".
- **Step 3:** Enter a name and description for your lead list.
- **Step 4:** Add leads manually or import from a CSV file.
- **Step 5:** Save the lead list.

### 3. Sending Mass Emails

- **Step 1:** Go to the "Mass Email" section.
- **Step 2:** Select a lead list to target.
- **Step 3:** Compose your email using the rich-text editor.
- **Step 4:** Insert product links if desired.
- **Step 5:** Preview the email and send.

### 4. Creating Custom Forms

- **Step 1:** Access the "Forms" section.
- **Step 2:** Click on "Create New Form".
- **Step 3:** Add custom questions and fields.
- **Step 4:** Save the form and generate a shareable link.
- **Step 5:** Distribute the form via email or social media.

### 5. Viewing Analytics

- **Step 1:** Head over to the "Analytics Dashboard".
- **Step 2:** Select a campaign or form to view metrics.
- **Step 3:** Analyze open rates, click-through rates, and user feedback.
- **Step 4:** Use insights to refine your strategies.

### 6. Gathering User Feedback

- **Step 1:** In the "Feedback" section, view comments from leads.
- **Step 2:** Respond to feedback directly within the app.
- **Step 3:** Implement suggestions to improve your offerings.

### 7. Social Media Sharing

- **Step 1:** Choose content (lead lists, forms) to share.
- **Step 2:** Click on the "Share" button.
- **Step 3:** Select the desired social media platform.
- **Step 4:** Post directly to your social media accounts.

## External APIs Used

- **Supabase Authentication:**
  - Used for secure user authentication and social logins.
- **SendGrid API:**
  - Utilized for sending mass emails to leads.
- **Google Analytics API:**
  - Employed to track and display interaction metrics.

*Please ensure to add the required API keys in the `.env` file as per the instructions in each service's documentation.*
