class State < ApplicationRecord
    validates :name, presence: true
    validates :description, presence: true
    validates :flag_image, presence: true
    validates :population, presence: true
    validates :capitol_name, presence: true
    validates :population, presence: true
    has_many :facts, dependent: :delete_all
end
