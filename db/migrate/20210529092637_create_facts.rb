class CreateFacts < ActiveRecord::Migration[6.1]
  def change
    create_table :facts do |t|
      t.string :title
      t.text :details
      t.float :lat
      t.float :lng

      t.timestamps
    end
  end
end
