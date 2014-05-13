class CompaniesController < ApplicationController

  def index
    @companies = Company.all
    respond_to do |format|
      format.json { render json: @companies }
    end
  end

  def create
    company = Company.new(name: params[:company][:name])
    if company.save
      respond_to do |format|
        format.json { render json: company, status: :created }
      end
    else
      respond_to do |format|
        format.json { render json: company.errors, status: :unprocessable_entity }
      end
    end
  end

end
