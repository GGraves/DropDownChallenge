function onload() {
  //root element grab 
  var initElem = $("body"); 

  //generate menu inside root element
  generateMenu( initElem, testMenu, 0);
}
      
function getColor(depth) {
  //apply the proper css class
  //controls menu item color
  if (depth === 0) {
    return 'root-item';
  } else if (depth === 1) {
    return 'sub-item1';
  } else if (depth === 2) {
    return 'sub-item2';
  } else {
    return 'sub-itemx';
  }
}

function getTitle(menuItem, title) {
  //return title of menuItem
  return menuItem.hasOwnProperty('title') && title !== null ? title : "";
}

function setAlert(title, elem) {
  elem.click(function(event) {
    event.stopPropagation();
    alert(title);
  });
}

function setHover(menuItem, subMenu) {
  //add hover logic
  menuItem.on("mouseenter", function(){
    subMenu.show("fast");
  });
  menuItem.on("mouseleave", function(){
    subMenu.hide("fast");
  });
}

function generateMenu() {
  //argument verification 
  if(arguments.length !== 3) {
    console.log('wrong number of arguments passed to generateMenu'); 
    return; 
  } else {
    var self = {};
    self.elem  = arguments[0];
    self.menu  = arguments[1];
    self.depth = arguments[2];
    
    //main menu elem generation
    for(var i = 0; i < self.menu.length; i++) {

      //concat elem string
      var elemString = ['<div class="menu-item ', 
                        getColor(self.depth),
                        '">',
                        getTitle(self.menu[i], self.menu[i].title),
                        '</div>'].join('');
        
      //create reference to elem object
      var menuItem = $(elemString);
  
      //set alert
      setAlert(self.menu[i].title, menuItem);
     
      //append item to parent 
      self.elem.append(menuItem);

      //recursive call
      if(self.menu[i].hasOwnProperty('submenu') && self.menu[i].submenu !== null) {
       
        //create sub-menu elem container and append to menuItem
        var subMenu = $('<div class="sub-menu"></div>');
        menuItem.append(subMenu);

        //set hover
        setHover(menuItem, subMenu);
        
        //create sub menuItems
        generateMenu(subMenu, self.menu[i].submenu, self.depth += 1);
      }
    }
    return;
  }
}

var testMenu = [
  {
    'title': 'Item 1',
    'submenu': null,
  },
  {
    'title': 'Item 2',
    'submenu': null,
  },
  {
    'title': 'Item 3',
    'submenu': [
      {
        'title': 'Sub 1',
        'submenu': null,
      },
      {
        'title': 'Sub 2',
        'submenu': null,
      },
      {
        'title': 'Sub 3',
        'submenu': [
          {
            'title': 'SubSub 1',
            'submenu': null,
          },
          {
            'title': 'SubSub 2',
            'submenu': null,
          },
          {
            'title': 'SubSub 3',
            'submenu': null,
          },
        ]
      }
    ]
  }
];
