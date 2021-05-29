class AddStateRefToFacts < ActiveRecord::Migration[6.1]
  def change
    add_reference :facts, :state, foreign_key: true
  end
end
