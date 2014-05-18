require 'spec_helper'

describe Asset do

  before(:each) do
    @valid_asset = FactoryGirl.build(:valid_asset)
  end

  it 'should be valid with proper values' do
    @valid_asset.should be_valid
  end

  context "Validations" do
    [:invoice_number, :serial_number, :purchased_date, :mac_address, :warranty].each do |attr|
      it "should not be valid without #{attr}" do
        @valid_asset[attr] = nil
        @valid_asset.should_not be_valid
        @valid_asset.errors.to_hash[attr].should_not be_nil
      end
    end
  end

end
