class MapsController < ApplicationController
  def index
    @state_names = State.all.map{|s| {name: s.name, id: s.id}}
    render :index
  end
end
