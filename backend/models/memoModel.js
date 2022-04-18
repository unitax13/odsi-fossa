const mongoose = require("mongoose");
const {marked} = require('marked')
const createDomPurify = require('dompurify')
const {JSDOM} = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

const memoSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
    },
    markdown: {
      type: String,
      required: [true, "Please add a text value"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    sanitizedHtml: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true,
  }
);

memoSchema.pre('validate', function (next) {
  if (this.markdown) {
    console.log("prevalidate")
    this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
  }

  next()
})



// memoSchema.post('findOneAndUpdate', async function (next) {
//   console.log("postfindOneAndUpdate")

//   const docToUpdate = await this.model.findOne(this.getQuery());
//   console.log(docToUpdate); // The document that `findOneAndUpdate()` will modify

//   // if (docToUpdate.markdown) {
//   //   console.log("postvalidate")
//   //   docToUpdate.sanitizedHtml = dompurify.sanitize(marked(docToUpdate.markdown))
//   // }
//   // console.log(docToUpdate)
//   docToUpdate.save()
//   // next()
// })

memoSchema.post('findOneAndUpdate', async function (next) {
  console.log("postfindOneAndUpdate")

  const docToUpdate = await this.model.findOne(this.getQuery());
  console.log(docToUpdate); // The document that `findOneAndUpdate()` will modify

  if (docToUpdate.markdown) {
    console.log("postfindoneaunupdate markdwon")
    docToUpdate.sanitizedHtml = dompurify.sanitize(marked(docToUpdate.markdown))
  }
  console.log(docToUpdate)
  docToUpdate.save()
  // next()
})




module.exports = mongoose.model('Memo', memoSchema)