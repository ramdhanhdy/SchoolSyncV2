// Test script to simulate user registration and test retry mechanism
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = 'https://iqysbtxkcqnxjgjvdnbu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxeXNidHhrY3FueGpnanZkbmJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3NjQ2MzQsImV4cCI6MjA2NDM0MDYzNH0.JVeMIGSGh5ewMh9FVCJY01biIGgwx6O2u9FLfIlWsMY';
const supabase = createClient(supabaseUrl, supabaseKey);

// Generate a unique email for testing
const testEmail = `testretrytester${Math.floor(Math.random() * 10000)}@gmail.com`;
const testPassword = 'Test123456!';

// Function to simulate user registration
async function testRegistration() {
  console.log(`Testing registration with email: ${testEmail}`);
  
  try {
    // Step 1: Register the user
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        data: {
          full_name: 'Test Retry User',
          role: 'management',
        },
      },
    });

    if (signUpError) {
      console.error('Registration error:', signUpError);
      return;
    }

    console.log('User registered successfully:', signUpData.user.id);
    
    // Set the session in the Supabase client to ensure proper authentication
    if (signUpData.session) {
      supabase.auth.setSession({
        access_token: signUpData.session.access_token,
        refresh_token: signUpData.session.refresh_token
      });
      console.log('Auth session set successfully');
    } else {
      console.log('No session available from signUp, attempting to get session...');
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData?.session) {
        console.log('Retrieved session successfully');
      } else {
        console.log('No session available, profile fetch may fail due to auth');
      }
    }
    
    // Step 2: Immediately try to fetch the profile (this would normally trigger the retry mechanism in the app)
    const { data: profileData, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', signUpData.user.id)
      .single();
    
    if (profileError) {
      console.error('Initial profile fetch error (expected if trigger is still processing):', profileError);
    } else {
      console.log('Profile fetched immediately (no retry needed):', profileData);
    }
    
    // Perform multiple retries with longer delays to match our updated loadUserProfile function
    const maxRetries = 5;
    const retryDelay = 1000; // 1 second
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      console.log(`Attempt ${attempt} of ${maxRetries}...`);
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, retryDelay));
      
      const { data: profileData, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', signUpData.user.id)
        .single();
      
      if (profileError) {
        console.error(`Profile fetch error on attempt ${attempt}:`, profileError);
        
        if (attempt === maxRetries) {
          console.log('Test result: FAILED - Profile not available after all retries');
        }
      } else {
        console.log(`Profile fetched successfully on attempt ${attempt}:`, profileData);
        console.log('Test result: SUCCESS - Profile available within retry window');
        break; // Exit the loop if successful
      }
    }
    
  } catch (error) {
    console.error('Unexpected error during test:', error);
  }
}

// Run the test
testRegistration();
