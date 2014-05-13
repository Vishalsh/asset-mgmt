# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do

  factory :valid_company, class: Company do |f|
    f.name 'Apple'
  end

  factory :invalid_company, class: Company do |f|
    f.name ''
  end

end
