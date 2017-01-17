class CreateProviders < ActiveRecord::Migration
  def change
    create_table :providers do |t|
      t.string :name
      t.float :percent

      t.timestamps null: false
    end
  end
end
