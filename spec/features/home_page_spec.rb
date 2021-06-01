require 'rails_helper'

RSpec.describe 'Home Page', type: :feature do 
    before(:all) do
        State.destroy_all
        @state1 = create(:state)
        @state2 = build(:state, name: 'New Mexico').save
    end
    context "Main Map" do
        it "should only load the 2 available states" do
            visit '/'

            expect(page).to have_current_path('/')
            expect(page.has_css?('div#map')).to eql(true)
        end
    end

    context "Sidebar" do 
        it "should load all HTML elements w/o content" do
            visit '/'
            expect(page.has_css?('#state-info-container')).to eql(true)
            within '#state-info-container' do
                expect(page.has_css?('#myselect')).to eql(true)
                expect(page.has_css?('button#search')).to eql(true)
                expect(page.has_css?('#state-content')).to eql(true)
                expect(page.has_css?('#state-name')).to eql(true)
                expect(page.has_css?('#state-flag-image')).to eql(true)
                expect(page.has_css?('#state-description')).to eql(true)
                expect(page.has_css?('#state-capitol')).to eql(true)
                expect(page.has_css?('#state-population')).to eql(true)
            end
        end
    end


    context "Main Map" do
        it "should zoom/center selected state, no markers" do
            # visit '/'

            # click 'Search'
            # save_and_open_page

            # within '#state-info-container' do
            #     expect(page).to have_content(@state1.name)
            #     expect(page).to have_content(@state1.description)
            end
        end
    end

        context "Sidebar" do
            it "should show content for that state" do

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