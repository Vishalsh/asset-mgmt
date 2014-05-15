class AssetTypePage < BasePage

  def initialize(page)
    @page = page
    raise "Not on the expected page" unless valid?
  end

  def valid?
    source.should have_css('.table')
  end

  def add_asset_type
    source.click_link("New")
    source.fill_in('asset_type_name', with:"Asset test")
    source.fill_in('asset_type_image_path', with:"Asset path")
    source.fill_in('asset_type_properties', with:"Asset properties")
    source.click_button ("Create")

  end
end