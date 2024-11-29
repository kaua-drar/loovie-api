class RemoveOriginalNameAndOriginalLanguageFromEpisodes < ActiveRecord::Migration[8.0]
  def change
    remove_column :episodes, :original_name, :string
    remove_column :episodes, :original_language, :string
  end
end
