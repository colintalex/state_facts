class StateSerializer < ActiveModel::Serializer
  has_many :facts
  attributes :id, :name, :description, :flag_image, :capitol_name, :population
end
