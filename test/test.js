// author: nfwyst 
// date: 2017/5/25
// updateDate: 2017/6/2 8:28
var assert = require('assert');
require('../co.js');

// each test
describe('each', () => {
  describe('object', () => {
    it('should return before break function', () => {
      var res = {};
      var src = {name: 'bob', age: 12, parent: {name: 'bobp', age: 42}, child: null, hello: 'wolrd' };
      src.each((item, id, obj, br) => {
        if ( item === null ) br('break');
        else res[id] = item;
      });
      assert.deepEqual(res, {name: 'bob', age: 12, parent: {name: 'bobp', age: 42}});
    });
  });

  describe('array', () => {
    it('should equal ["0", "1", "2"]', () => {
      var res = [];
      var src = [1,2,3];
      src.each(( item, id, arr ) => {
        res.push(id);
      });
      assert.deepEqual(res, ['0','1','2']);
    });
  });

  describe('string', () => {
    it('should equal "123"', () => {
      var res = '';
      var src = '123';
      src.each(( item, id, arr ) => {
        res+=item;
      });
      assert.strictEqual(res, '123');
    });
  });
});

// map test
describe('map', () => {
  describe('object', () => {
    it('should return before break function', () => {
      var res = {};
      var src = {
        name: 'bob',
        age: 12,
        parent: {
          name: 'bobp',
          age: 42,
        },
      };
      res = src.map((item, id, obj, cb) => {
        if ( id === 'age' ) {
          cb('break, please...');
        }
        return id;
      });
      assert.deepEqual(res, {
        context: {
          age: 12,
          name: 'bob',
          parent: {
            age: 42,
            name: 'bobp',
          },
        },
        key: 'age',
        msg: 'break, please...',
        value: {
          name: 'name',
          age: 'age',
        },
      });
    });
  });
  describe('string', () => {
    it('should return object after break func', () => {
      var res = [];
      var src = '123';
      res = src.map((item, id, arr, cb) => {
        if ( id === 1 ) {
          cb('ah');
        }
        return item * item;
      });
      assert.deepEqual(res, {
        value: '14',
        key: '1',
        context: '123',
        msg: 'ah'
      });
    });
    describe('array', () => {
      it('should return before break_func', () => {
        var res = '';
        var src = [1,2,3];
        res = src.map((item, id, arr, cb) => {
          if ( id === 1 ) { cb('sorry') }
          return Number(item) * Number(item);
        });
        assert.deepEqual(res, {
          value: [ 1, 4 ],
          key: 1,
          context: [ 1, 2, 3 ],
          msg: 'sorry' }
        );
      });
    });
  });
});

// replaceOne_by_index test
describe('replaceOne_by_index', () => {
  describe('object', () => {
    it('name should to be pop', () => {
      var res = {};
      var src = {
        name: 'bob',
        age: 12,
        parent: {
          name: 'bobp',
          age: 42,
        },
      };
      res = src.replaceOne_by_index('parent.name', 'pop');
      assert.deepEqual(res, {
        name: 'bob',
        age: 12,
        parent: {
          name: 'pop',
          age: 42,
        },
      });
    });
  });
  describe('array', () => {
    it('expect to equal [99,2,3]', () => {
      var src = [1,1,3];
      src.replaceOne_by_index(0, 99);
      assert.deepEqual(src, [99,1,3]);
    });
  });
  describe('string', () => {
    it('expect to be 1aa', () => {
      var src = 'aaa';
      var res = '';
      res = src.replaceOne_by_index(0,'1');
      assert.deepEqual(res, '1aa');
    });
  });
});

// util

// Array
describe('array', () => {
  it('init', () => {
    var esp = [1,1,1];
    var res = Array.init(3,1);
    assert.deepEqual(res, esp);
  });
  it('insert', () => {
    var src = [1,2,3];
    src.insert(2,9);
    assert.deepEqual([1,2,9,3], src);
  });
  it('getOne', () => {
    var src = [1];
    var res = src.getOne();
    assert.deepEqual(res, 1);
  });
});

// replaceAll
describe('replaceAll', () => {
  describe('object', () => {
      it('name should be hello', () => {
        var src = {
          name: 'bob',
          age: 12,
          parent: {
            name: 'bobp',
            age: 42,
          },
        };
        src.replaceAll('bob', 'hello');
        assert.deepEqual(src, {
          name: 'hello',
          age: 12,
          parent: {
            name: 'bobp',
            age: 42,
          },
        });
      });
  });
  describe('array', () => {
    it('should to be [0,0,3,0,2]', () => {
      var src = [1,1,3,1,2];
      src.replaceAll(1,0);
      assert.deepEqual(src, [0,0,3,0,2]);
    });
  });
  describe('string', () => {
    it('shoudl to be abbbb', () => {
      var src = 'acccc';
      var res = src.replaceAll('c', 'b');
      assert.deepEqual(res, 'abbbb');
    } );
  });
});

// Object.prototype.keys
describe('keys', () => {
  it('object', () => {
    var src = {
      name: 'bob',
      age: 12,
      parent: {
        name: 'bobp',
        age: 42,
      },
    };
    var res = src.keys();
    assert.deepEqual(res, ['name', 'age', 'parent']);
  });
  it('array', () => {
    var src = [1,2,3];
    var res = [];

    res = src.keys();
    assert.deepEqual( res, [0,1,2]);
  });
  it('string', () => {
    var src = 'test';
    var res = [];
    res = src.keys();
    assert.deepEqual(res, [0,1,2,3]);
  });
});
// values
describe('values', () => {
  it('object', () => {
    var src = {
      name: 'bob',
      age: 12,
      parent: {
        name: 'bobp',
        age: 42,
      },
    };
    var res = src.values();
    assert.deepEqual(res, ['bob', 12, {name: 'bobp', age: 42}]);
  });
  it('array', () => {
    var src = [1,2,3];
    var res = [];

    res = src.values();
    assert.deepEqual( res, [1,2,3]);
  });
  it('string', () => {
    var src = 'test';
    var res = [];
    res = src.values();
    assert.deepEqual(res, ['t', 'e', 's', 't']);
  });
});

// clone test
describe('clone', () => {
  describe('object', () => {
    it('original object should deepEqual to cloned object', () => {
      var src = {
        name: 'bob',
        age: 12,
        parent: {
          name: 'bobp',
          age: 42,
        },
      };
      var res = src.clone();
      assert.deepEqual(res,src);
    } );
    it('original object should not equal to cloned object', () => {
      var src = {
        name: 'bob',
        age: 12,
        parent: {
          name: 'bobp',
          age: 42,
        },
      };
      var res = src.clone();
      assert.notEqual(res,src);
    } );
  } );
  describe('array', () => {
    it('original array should deepEqual to cloned array', () => {
      var src = [1,2,3];
      var res = src.clone();
      assert.deepEqual(src, res);
    } );
    it('original array should not equal to cloned array', () => {
      var src = [1,2,3];
      var res = src.clone();
      assert.notEqual(src,res);
    } );
  });
} );

// keys_all
describe('keys_all', () => {
  describe('object', () => {
    it('shuld includes all keys', () => {
      var src = {
        name: 'bob',
        age: 12
      };
      src.__proto__.like = 'pingpong';
      var res = src.keys_all();
      assert.deepEqual(res, ['name', 'age', 'like']);
    } );
  } );
  describe('array', () => {
    it('should includes all keys above', () => {
      var src = [1,2,3];
      var res = src.keys_all();
      assert.deepEqual([0,1,2,'like'], res);
    } );
  } );
} );

// filter test
describe( 'filter', () => {
  describe( 'object', () => {
    it( 'should return { age: 12 }', () => {
      var src = {
        name: 'bob',
        age: 12,
        parent: {
          name: 'bobp',
          age: 42,
        },
      };
      var res = src.filter((item, id, obj) => {
        return item >= 12
      } );
      assert.deepEqual( res, { age: 12 } );
    } );
  } );
  describe( 'array', () => {
    it( 'should return [1,2,3]', () => {
      var src = [1,2,3,4,5,6];
      var res = src.filter( (item, id, obj) => {
        return item < 4;
      } );
      assert.deepEqual(res, src.splice(0,3));
    } );
  } );
  describe( 'string', () => {
    it( 'should return hello', () => {
      var src = 'hello world';
      var res = src.filter( (item, id, obj) => {
        return id < 5;
      } );
      assert.deepEqual( res, 'hello' );
    } );
  } );
} );
// find test
describe('find', () => {
  describe('object', () => {
    it('should return { age: 12 }', () => {
      var src = {
        name: 'bob',
        age: 12,
        parent: {
          name: 'bobp',
          age: 42,
        },
      };
      var res = src.find((item, id, obj, cb) => {
        if ( item === 12 ) {
          return true;
        }
      });
      assert.deepEqual(res, { age: 12 });
    })
  });
  describe('array', () =>{
    it('should return [1]', () => {
      var src = [1,2,1,4];
      var res = src.find((item, id, obj) => {
        return item === 1;
      });
      assert.deepEqual([1], res);
    });
  });
  describe('string', () => {
    it('abc', () => {
      var src = 'abcde';
      var res = src.find((item, id, obj) => {
        return item === 'a';
      });
      assert.deepEqual('a', res);
    });
  });
});
// every test
describe('every', () => {
  it('object', () => {
    var src = {
      name: 'bob',
      age: 12
    };
    var res = src.every((item, id, obj) => {
      return item === 12
    });
    assert.equal(res, false);
  });
  it('array', () => {
    var src = [1,2,3,4,5,6];
    var res = src.every((item, id, obj) => {
      return item >= 1;
    });
    assert.equal(res, true);
  });
  it('string', () => {
    var src = 'hello';
    var res = src.every((item, id, obj) => {
      return item >= 'a';
    });
    assert.equal(res, true);
  });
});
// some test
describe('some', () => {
  describe('object', () => {
    it('should return true', () => {
      var src = {
        name: 'bob',
        age: 12,
        parent: {
          name: 'bobp',
          age: 42,
        },
      };
      var res = src.some((item, id, obj) => {
        return item === 12 && id === 'age';
      });
      assert.equal(res, true);
    });
  });
  describe('array', () => {
    it('should return false', () => {
      var src = [1,2,3];
      var res = src.some((item, id, obj) => {
        return item === 4;
      });
      assert.equal(res, false);
    });
  });
  describe('string', () => {
    it('should return true', () => {
      var src = 'hello, world';
      var res = src.some((item, id, obj) => {
        return item === 'd';
      });
      assert.equal(res, true);
    });
  });
});
// includes test
describe('includes', () => {
  describe('string', () => {
    it('should return true', () => {
      var src = 'hello, world';
      var res = src.includes('rld');
      assert.equal( res, true );
    });
  });
  describe('object', () => {
    it('should return true', () => {
      var src = {
        name: 'bob',
        age: 12,
        parent: {
          name: 'bobp',
          age: 42
        },
      };
      var res = src.includes('parent');
      assert.equal( res, true );
    });
  });
  describe('array', () => {
    it('should return true', () => {
      var src = [1,2,3,4];
      var res = src.includes(4);
      assert.equal( res, true );
    });
  });
});
// to group test
describe('to_group', () => {
  it('should return [[1,2,3],[4,5,6],7]', () => {
    var src = [1,2,3,4,5,6,7];
    var res = src.to_group(3);
    assert.deepEqual([[1,2,3],[4,5,6],7], res);
  });
});
// max test
describe('max_test', () => {
  it('should return the max item of array', () => {
    var src = [1,2,3,4,5];
    var res = src.max();
    assert.equal(res, 5);
  })
})
// sortBy test
describe('sortBy', () => {
  it('should sort by age', () => {
    var src = [
      {
        name: 'hello',
        age: 10
      },
      {
        name: 'world',
        age: 67
      },
      {
        name: 'mine',
        age: 1
      },
      {
        name: 'bob',
        age: 99
      }
    ];
    var res = src.sortBy((item, id, obj) => {
      return item.age;
    });
    assert.deepEqual(res,
                [{ name: 'mine', age: 1 },
                { name: 'hello', age: 10 },
                { name: 'world', age: 67 },
                { name: 'bob', age: 99 } ]);
  });
});
// groupBy test
describe( 'groupBy', () => {
  it('should group by name', () => {
    var src = {
      item1: {
        name: "bob",
        age: 12
      },
      item2: {
        name: "bob",
        age: 99
      },
      item3: {
        name: "pop",
        age: 0
      }
    };
    var res = src.groupBy('name');
    assert.deepEqual(res,
      {
         bob: [
           { name: 'bob', age: 12 },
           { name: 'bob', age: 99 }
         ],
         pop: [
           { name: 'pop', age: 0 }
         ]
      });
  });
});
