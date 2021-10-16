class HomeController < ApplicationController
  def index
    @state_names = State.all.map{|s| {name: s.name, id: s.id}}
    job = ReportJob.create!(run_at: 5.minutes.from_now)
    render :index
  end
end
