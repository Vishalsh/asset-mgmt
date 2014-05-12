# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do

  factory :valid_admin, class: Admin do |f|
    f.ad_id 'vishalsh'
    f.name 'Vishal sharma'
  end

  factory :invalid_admin, class: Admin do |f|
    f.ad_id ''
    f.name 'Vishal sharma'
  end

end
