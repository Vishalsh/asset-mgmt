class AdminsController < ApplicationController

  def index
    @admins = Admin.all
    respond_to do |format|
      format.json { render json: @admins }
    end
  end

  def create
    admin = Admin.new(ad_id: params[:admin][:ad_id], name: params[:admin][:name])
    if admin.save
      respond_to do |format|
        format.json { render json: admin, status: :created }
      end
    else
      respond_to do |format|
        format.json { render json: admin.errors, status: :unprocessable_entity }
      end
    end
  end

  def edit
    @admin = Admin.find(params[:id])
    respond_to do |format|
      format.json { render json: @admin, status: :ok }
    end
  end

  def show
    admin = Admin.find(params[:id])
    respond_to do |format|
      format.json { render json: admin, status: :created }
    end
  end

  def update
    @admin = Admin.find(params[:id])
    if @admin.update_attributes(ad_id: params[:admin][:ad_id], name: params[:admin][:name])
      respond_to do |format|
        format.json { render json: @admin, status: :ok }
      end
    else
      respond_to do |format|
        format.json { render json: @admin.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    admin = Admin.find(params[:id])
    admin.destroy
    respond_to do |format|
      format.json { render json: admin, status: :ok }
    end
  end

  def names
    names = Admin.pluck(:name)
    respond_to do |format|
      format.json { render json: names, status: :ok }
    end
  end

end
