class SessionsController < ApplicationController
   
    def login       
                
        user = User.find_by!(name: params[:username])        
        
        if user&.authenticate(params[:password])
            session[:current_user] = user.id
            render json: user, status: :ok
        else           
            render json: { errors: "Invalid Password or Username" }, status: :unprocessable_entity
        end
    end

    def logout
        session.delete :current_user
    end 
end

