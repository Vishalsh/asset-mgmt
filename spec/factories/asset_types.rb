# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define  do
  factory :valid_asset_type, class: AssetType do |f|
    f.name 'laptop'
    f.image_path '/assets/laptop.png'
    f.properties ['mac_address', 'ram', 'hard disk']
  end
end
