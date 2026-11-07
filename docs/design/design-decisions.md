# Fresh Track Architecture Decision Records

These decisions describe the proposed design. Performance and model accuracy targets must be verified during implementation.

## ADR-01: Pantry data storage

- **Issue:** Fresh Track must store pantry items and expiry dates and support listing or ordering items by expiry.
- **Selected option:** PostgreSQL.
- **Alternative:** CSV or JSON files.
- **Reason and trade-off:** PostgreSQL provides structured tables and indexes that support queries such as searching and ordering pantry records. File storage may be simpler initially, but is less suitable for structured queries and concurrent updates. An index may help with relevant queries, but the 2-second loading target still needs to be measured.
- **Reference:** [PostgreSQL documentation: Indexes and ORDER BY](https://www.postgresql.org/docs/current/indexes-ordering.html)

## ADR-02: Ingredient image classification

- **Issue:** Fresh Track must classify food photos into at least 10 ingredient classes, targeting at least 85% top-1 accuracy on held-out images.
- **Selected option:** Fine-tune a pre-trained MobileNetV2 model using transfer learning.
- **Alternative:** Train an image classifier from scratch.
- **Reason and trade-off:** Transfer learning reuses features learned by a previously trained model, making it a suitable approach when the project dataset is limited. The classifier must still be evaluated using a fixed train/test split; the target accuracy cannot be assumed.
- **Reference:** [TensorFlow: Transfer learning and fine-tuning](https://www.tensorflow.org/guide/keras/transfer_learning)
