class ReportJob < RocketJob::Job
    # Retain the job when it completes
  self.destroy_on_complete = false
  
  def perform
    puts "Hello World" 
  end
end