class CreateImageAssets < ActiveRecord::Migration
  def change
    create_table :image_assets do |t|
      t.text :image_path

      t.timestamps
    end
  end
end
