import React from 'react'
import { Menu, Segment } from 'semantic-ui-react'

export const Navbar = () => {
    return (
        <div>
        <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item
            name='home'
          /* active={activeItem === 'home'}
            onClick={this.handleItemClick} */
          />
          <Menu.Item
            name='messages'
          /*  active={activeItem === 'messages'}
            onClick={this.handleItemClick} */
          />
          <Menu.Item
            name='friends'
          /*  active={activeItem === 'friends'}
            onClick={this.handleItemClick}*/
          />
        </Menu>
      </Segment>
      </div>
    )
}
