Given(/^I am on assets type page$/) do
visit "http://localhost:3000/#asset_types"
  @asset_type_page = AssetTypePage.new(page)
  @asset_type_page.valid?

end

When(/^I add an asset type$/) do
  @asset_type_page.add_asset_type
end

Then(/^it should be listed on assets type page$/) do
  pending # express the regexp above with the code you wish you had
end