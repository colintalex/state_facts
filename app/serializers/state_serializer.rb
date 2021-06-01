class StateSerializer < ActiveModel::Serializer
  has_many :facts
  attributes :id, :name, :description, :capitol_name, :flag_image, :population
end
