// test 1 - Eric

const styles = {
    root:{
      height:'100vh',
      display: 'block',
      justifyContent: 'space-evenly',
      alignContent: 'center',
    }
}

test('oh it has to be ALL THE WAY UP! ', () => {
    expect(styles.root.height).toBe('100vh');
  });



//test 2 - Eric
  const styles1 = {
    button: {
        // margin: theme.spacing.unit,
        marginTop: 100,
        width: 200,
      },
}


test('the button has to be exact, buttons matter', () => {
    expect(styles1.button.width).toBeGreaterThanOrEqual(200);
  });




// test('', () => {
//     expect(styles1.button.width).toBeGreaterThanOrEqual(200);
//   });

  // make other functions and test them, they don't have to be associated with this app