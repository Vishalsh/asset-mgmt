require 'spec_helper'

describe Admin do

  before(:each) do
    @valid_admin = FactoryGirl.build(:valid_admin)
  end

  it 'should be valid with proper values' do
    @valid_admin.should be_valid
  end

  context "Validations" do
    [:ad_id, :name].each do |attr|
      it "should not be valid without #{attr}" do
        @valid_admin[attr] = nil
        @valid_admin.should_not be_valid
        @valid_admin.errors.to_hash[attr].should_not be_nil
      end
    end
  end

end
