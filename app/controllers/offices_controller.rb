class OfficesController < ApplicationController

  def index
    @offices = Office.all
    respond_to do |format|
      format.json { render json: @offices }
    end
  end

  def create
    office = Office.new(name: params[:office][:name])
    if office.save
      respond_to do |format|
        format.json { render json: office, status: :created }
      end
    else
      respond_to do |format|
        format.json { render json: office.errors, status: :unprocessable_entity }
      end
    end
  end

  def edit
    @office = Office.find(params[:id])
    respond_to do |format|
      format.json { render json: @office, status: :ok }
    end
  end

  def show
    office = Office.find(params[:id])
    respond_to do |format|
      format.json { render json: office, status: :created }
    end
  end

  def update
    @office = Office.find(params[:id])
    if @office.update_attributes(name: params[:office][:name])
      respond_to do |format|
        format.json { render json: @office, status: :ok }
      end
    else
      respond_to do |format|
        format.json { render json: @office.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    office = Office.find(params[:id])
    office.destroy
    respond_to do |format|
      format.json { render json: office, status: :ok }
    end
  end

end
