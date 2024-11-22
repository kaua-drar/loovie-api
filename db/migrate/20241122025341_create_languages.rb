class CreateLanguages < ActiveRecord::Migration[8.0]
  def change
    create_table :languages, id: :uuid do |t|
      t.string :code
      t.string :name

      t.timestamps
    end
  end
end
