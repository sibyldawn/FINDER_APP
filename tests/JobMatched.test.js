// test 1 - Eric

const styles = {
    root:{
      height:'100vh',
      display: 'block',
      justifyContent: 'space-evenly',
      alignContent: 'center',
    },
    button: {
      marginTop: 100,
      width: 200,
    },
}

test('oh it has to be ALL THE WAY UP! ', () => {
    expect(styles.root.height).toBe('100vh');
  });



//test 2 - Eric
  

test('the button has to be exact, buttons matter', () => {
    expect(styles.button.width).toBeGreaterThanOrEqual(200);
  });




// test('', () => {
//     expect(styles1.button.width).toBeGreaterThanOrEqual(200);
//   });

  // make other functions and test them, they don't have to be associated with this app