class ListItem < ActiveRecord::Base
  belongs_to :list
  default_scope { order(:rank) }

  def move_to(new_rank)
    if new_rank < rank then
      sql = "UPDATE list_items
              SET rank = rank + 1
              WHERE list_id = #{list.id}
              AND rank >= #{new_rank}
              AND rank <= #{rank}"
    else
      sql = "UPDATE list_items
              SET rank = rank - 1
              WHERE list_id = #{list.id}
              AND rank <= #{new_rank}
              AND rank >= #{rank}"
    end

    ActiveRecord::Base.connection.execute(sql)
    self.rank = new_rank
    save
  end
end
