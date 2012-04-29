class Page < ActiveRecord::Base
  attr_accessible :title, :slug, :content, :important, :person_id, :menu

  belongs_to :person
end