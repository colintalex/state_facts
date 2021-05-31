require 'rails_helper'

RSpec.describe 'Home Page', type: :feature do 
        context "Main Map" do
            it "should only load the 2 available states" do
                visit '/'

                expect(page).to have_current_path('/')
                expect(page.has_css?('div#map')).to eql(true)
            end
        end

        context "Sidebar" do 
            it "should load dropdown w/ 2 states, Search button and no other info" do
                visit '/'

                expect(page.has_css?('#state-info-container'))
            end
        end


    xscenario "When first State is selected" do
        context "Main Map" do
            it "should zoom/center selected state, no markers" do

            end
        end

        context "Sidebar" do
            it "should show content for that state" do

            end
        end
    end

    xscenario "When succeeding state(s) are selected" do
        context "Main Map" do
            it "should clear markers and zoom/move to next state (same state selection applies" do

            end
        end

        context "Sidebar" do
            it "should clear old information and replace with new" do

            end
        end
    end
end