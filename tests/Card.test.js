


//test 3 and 4- Eric
state = { 
    expanded: false,
    user: ''
  };


  test('checking the state of things', () => {
        expect(state.expanded).toBeFalsy();
       });
    

  test('oh that state string thoooo', () => {
        expect('').not.toHaveLength(5);    
         });



//test 5 - Eric
       const styles = {
        card: {
          minWidth: 350,
          maxWidth: "60%",
          marginLeft: 'auto',
          marginRight: 'auto',
          minHeight: 500,
          top: 150,
          right:30,
          overflow: "scroll",
          userSelect: 'no'
        }};



       test('scrollllll along', () => {
        expect(styles.card.overflow).toBe("scroll");
       });

       