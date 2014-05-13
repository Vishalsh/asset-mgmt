require 'spec_helper'

describe CompaniesController do

  describe 'GET #index' do
    it 'should render the companies' do
      get :index, format: :json
      company = FactoryGirl.create(:valid_company);
      assigns(:companies).should include(company)
    end
  end

  describe 'POST #create' do

    describe 'With valid attributes' do

    end

    it 'should create a new comapny' do
      expect { post :create, company: FactoryGirl.attributes_for(:valid_company), format: :json }.to change(Company, :count).by(1)
    end

    it 'renders the created company as json' do
      valid_company = FactoryGirl.build(:valid_company)
      post :create, company: valid_company, format: :json
      response.body.should include (valid_company.name)
    end

    it 'respond with a 201' do
      post :create, company: FactoryGirl.attributes_for(:valid_company), format: :json
      response.status.should eq(201)
    end

  end

  describe 'with invalid attributes' do

    it 'should not create a new company' do
      expect { post :create, company: FactoryGirl.attributes_for(:invalid_company), format: :json }.to change(Company, :count).by(0)
    end

    it 'should render the errors as json' do
      post :create, company: FactoryGirl.attributes_for(:invalid_company), format: :json
      expect(response.body).to eq("{\"name\":[\"can't be blank\"]}")
    end

    it 'respond with a 422' do
      post :create, company: FactoryGirl.attributes_for(:invalid_company), format: :json
      response.status.should eq(422)
    end

  end

end
