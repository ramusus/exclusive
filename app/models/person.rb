class Person < ActiveRecord::Base
  default_scope :order => 'id ASC'
  has_attached_file :avatar, :styles => {:thumb => "80x80>" }
  attr_accessible :name, :occupation, :description, :avatar

  has_many :pages
  has_many :reviews

  def repr
    self.name + ', ' + self.occupation
  end

end