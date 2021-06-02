require 'rails_helper'

RSpec.describe 'Home Page', type: :feature do 
    before(:all) do
        State.destroy_all
        @state1 = create(:state)
        @state2 = build(:state, name: 'New Mexico')
        @state2.save
    end
    describe "Map and Sidebar" do
        it "should initally load all elements w/ empty state info" do
            visit '/'

            expect(page).to have_current_path('/')
            expect(page.has_css?('div#map')).to eql(true)
            expect(page.has_css?('div#divider')).to eql(true)
            expect(page.has_css?('div#state-info')).to eql(true)
            within '#state-info' do
                expect(page.has_css?('div#search-container')).to eql(true)
                expect(page.has_css?('div#state-content')).to eql(true)
            end
            within '#search-container' do
                expect(page.has_css?('div#label-container')).to eql(true)
                expect(page.has_css?('div#dropdown-wrapper')).to eql(true)
            end
            within '#myselect' do
                expect(find(:xpath, "//option[contains(text(), '#{@state1.name}')]").text).to eql(@state1.name)
                expect(find(:xpath, "//option[contains(text(), '#{@state1.name}')]").value.to_i).to eql(@state1.id)
                expect(find(:xpath, "//option[contains(text(), '#{@state2.name}')]").text).to eql(@state2.name)
                expect(find(:xpath, "//option[contains(text(), '#{@state2.name}')]").value.to_i).to eql(@state2.id)
            end
            within '#state-info' do
                expect(page).to have_css 'h1#state-name', text: ''
                expect(page).to have_css 'p#state-description', text: ''
                expect(page).to have_css 'img#state-flag-image', text: ''
                expect(page).to have_css 'p#state-capitol', text: ''
                expect(page).to have_css 'p#state-population', text: ''
                expect(page).to have_css 'p#facts-header', text: 'Fun Facts [click to reveal location on map]:'
                expect(page).to have_css 'ul#state-facts', text: ''
            end
        end
    end

    describe "Header/Nav" do
        it "loads image, font" do
            visit '/'

            expect(page).to have_css 'nav#page-header'
            within '#page-header' do
                expect(page).to have_css 'img#header-logo'
                expect(page).to have_css 'h1#header-text', text: 'STATE FACTS'
            end
        end
    end
end
