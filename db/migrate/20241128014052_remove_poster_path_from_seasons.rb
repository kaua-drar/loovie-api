class RemovePosterPathFromSeasons < ActiveRecord::Migration[8.0]
  def change
    remove_column :seasons, :poster_path, :string
  end
end