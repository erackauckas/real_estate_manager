class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
  include ActionController::Cookies
  
  def current_user
    User.find_by(id: session[:current_user])
  end

  def is_authorized?
      return render json: { error: "Not Authorized" }, status: :unauthorized unless current_user
  end

  def is_admin?
      return render json: { error: "Not Authorized" }, status: :unauthorized unless current_user.admin
  end

  private
  
  def record_not_found(error)
      render json: {error: error.message}, status: :not_found
  end
  
  def record_invalid(error)
      render json: {errors: [error.record.errors.full_messages]}, status: :unprocessable_entity
  end
  
end