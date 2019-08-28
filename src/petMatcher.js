/* Edit the function "petMatcher" that matches each pet to other they may get along
with, i.e. they "like" them and don't "dislike" that type of pet. Also make sure
the owners of each pet are in the same city! */

/* Example output:

Carrot the cat, Big Floof the cat and Dwayne the rock can all hang out in
Toronto with Emily, Lyla and Stephanie.

Sherbert the cat and Fudge the dog can all hang out in Vancouver with 
Prisha and Arya.

*/ 

const petMatcher = petData => {

  const humans = Object.keys(petData.humans).map((human) => {
    return {
      name: human,
      location: petData.humans[human].location,
      pet: petData.pets.filter((pet) => {
              if (pet.human === human) {
                return pet;
              }
            }).map((singlePet) => {
              return {

                ...singlePet,
                dislikes: singlePet.dislikes.map((dislikePet) => {
                  return dislikePet.slice(0, -1);
                }),
                likes: singlePet.likes.map((likePet) => {
                  return likePet.slice(0, -1);
                })
              }
            })
    }
  });

  const locations = Object.values(petData.humans)
    .map((locationObj) => {
      return locationObj.location;
    })
    .filter((location, index, list) => {
      return list.indexOf(location) == index;
    })
  
  const humansFiltered = [];
  locations.forEach((location) => {
    
    const obj = {};
    obj[location] = [];
    
    humans.forEach((human) => {
      if (location === human.location) {
        obj[location].push(human);
      }
    })

    humansFiltered.push(obj);
  })


  //Final

  const test = [];

  humansFiltered.forEach((location) => {

    const different = [];

    location[Object.keys(location)[0]].forEach((firstPerson) => {
      
      location[Object.keys(location)[0]].forEach((otherPerson) => {
        
        if (firstPerson.pet.length > 0 && otherPerson.pet.length > 0 && firstPerson !== otherPerson) {

          if (otherPerson.pet[0].likes.includes(firstPerson.pet[0].type) && !otherPerson.pet[0].dislikes.includes(firstPerson.pet[0].type) ) {
            
            console.log('dislikes', otherPerson.pet[0].dislikes, firstPerson.pet[0].type);
            console.log('likes', otherPerson.pet[0].likes, firstPerson.pet[0].type);
            
            different.push(firstPerson.pet[0].name);
          }
        }
      })
    })
  })





  return "This string gets put into the right side of Code Sandbox! You could even use <strong>HTML</strong> <em>if you want</em>!";
};

export default petMatcher;
