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

  def edit
    @company = Company.find(params[:id])
    respond_to do |format|
      format.json { render json: @company, status: :ok }
    end
  end

  def show
    company = Company.find(params[:id])
    respond_to do |format|
      format.json { render json: company, status: :created }
    end
  end

  def update
    @company = Company.find(params[:id])
    if @company.update_attributes(name: params[:company][:name])
      respond_to do |format|
        format.json { render json: @company, status: :ok }
      end
    else
      respond_to do |format|
        format.json { render json: @company.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    company = Company.find(params[:id])
    company.destroy
    respond_to do |format|
      format.json { render json: company, status: :ok }
    end
  end


end
