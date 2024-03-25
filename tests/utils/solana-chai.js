import * as anchor from '@coral-xyz/anchor'
import {use, Assertion, expect as expectChai} from 'chai'
import chaiAsPromise from 'chai-as-promised'

const {BN} = anchor.default;
const {PublicKey} = anchor.web3
use(chaiAsPromise)

Assertion.overwriteMethod("equal", function (_super) {
  return function assert(actual) {
    const expected = this._obj;

    if(BN.isBN(expected)) {
      this.assert(
        expected.toString() === `${actual}`,
        'expected BN to equal #{exp} but got #{act}',
        'expected BN not to equal #{exp} but got #{act}',
        expected.toString(),
        actual
      )
    } else if(expected instanceof PublicKey) {
      this.assert(
        expected.toString() === actual.toString(),
        'expected public key to equal #{exp} but got #{act}',
        'expected public key not to equal #{exp} but got #{act}',
        expected.toString(),
        actual.toString(),
      )
    } else {
      // use the default chai assertions
      _super.apply(this, arguments)
    }
  }
})

export const expect = expectChai
