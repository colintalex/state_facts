class Fact < ApplicationRecord
    validates :title, presence: true
    validates :details, presence: true
    validates :lat, presence: true
    validates :lng, presence: true
end
