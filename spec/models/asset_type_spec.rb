require 'spec_helper'

describe AssetType do

  before(:each) do
    @valid_asset_type = FactoryGirl.build(:valid_asset_type)
  end

  it 'should be valid with proper values' do
    @valid_asset_type.should be_valid
  end

  context "Validations" do
    [:name, :image_path, :properties].each do |attr|
      it "should not be valid without #{attr}" do
        @valid_asset_type[attr] = nil
        @valid_asset_type.should_not be_valid
        @valid_asset_type.errors.to_hash[attr].should_not be_nil
      end
    end
  end

  it 'should trim the white spacing from asset type properties' do

    properties_with_white_speaces = ['       ram', 'harddisk      ', 'processor']
    properties = ['ram', 'harddisk', 'processor']
    asset_type = AssetType.new

    expect(asset_type.trim_properties(properties_with_white_speaces)).to match_array(properties)

  end

end
