class Fact < ApplicationRecord
    validates :title, presence: true
    validates :details, presence: true
    validates :lat, presence: true
    validates :lng, presence: true
    belongs_to :state
    validates_presence_of :state
end
