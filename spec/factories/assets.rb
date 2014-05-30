# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do

  factory :valid_asset, class: Asset do |f|
    f.invoice_number '01234'
    f.serial_number '56789'
    f.purchased_date '22-05-2014'
    f.mac_address '4f:3a:54:32:78:e5'
    f.warranty '1 year'
    f.properties 'ram' => '5', 'harddisk' => '500', 'processor' => 'dual core'
  end

  factory :invalid_asset, class: Asset do |f|
    f.invoice_number ''
    f.serial_number '56789'
    f.purchased_date '22-05-2014'
    f.mac_address '4f:3a:54:32:78:e5'
    f.warranty '1 year'
    f.properties 'ram' => '5', 'harddisk' => '500', 'processor' => 'dual core'
  end

end
